from rest_framework import viewsets, status
from .models import FeeStructure,FeeStructureComponent
from .serializers import FeeStructureSerializer,FeeStructureComponentSerializer
from rest_framework.response import Response
from utils.ApiResponse import ApiResponse
from rest_framework.decorators import action


# Create your views here.

class FeeStructureViewSet(viewsets.ModelViewSet):
    queryset = FeeStructure.objects.all()
    serializer_class = FeeStructureSerializer
    lookup_field = 'id'
    response = ApiResponse()

    def api_response(self, message, status_code):
        return Response(
            ApiResponse(message=message, status=status_code).toDict(),
            status=status_code
        )

    @action(detail=False, methods=['post'], url_path='create_fee_structure')
    def create_fee_structure(self, request):

        title = request.data.get('title')
        year = request.data.get('year')
        grade = request.data.get('grade')
        components = request.data.get('components', [])

        if not title or not year or not grade or not components:
            return self.api_response('Check For Empty Field!',status.HTTP_404_NOT_FOUND)

        try:
            feeStructure_instance = FeeStructure.objects.create(
                title = title,
                year = year,
                grade = grade,
            )
            feeStructure_instance.save()
            for component in components:
                feeStructure_Component_instance = FeeStructureComponent.objects.create(
                    feeStructureParent = feeStructure_instance,
                    description = component['description'],
                    amount = component['amount'],
                    term = component['term'],
                    deadline = component['deadline']
                )
                feeStructure_Component_instance.save()
        except Exception as e:
            return self.api_response('Error Creating Fee Structure!',status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return self.api_response('Fee Structure Created Successfully!',status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'],url_path='get_all_fee_structures')
    def get_all_feeStructures(self, request):
        feeStructures_list = []

        if not self.queryset:
            self.response.setStatusCode(status.HTTP_404_NOT_FOUND)
            self.response.setMessage("No Fee Structures found!")
            self.response.setEntity(feeStructures_list)
            return Response(self.response.toDict(), status=self.response.status)

        try:
            for feeStructure in self.queryset:
                feeStruct_dict = {}
                feeStruct_dict['id'] = feeStructure.fee_struct_id
                feeStruct_dict['title'] = feeStructure.title
                feeStruct_dict['grade'] = feeStructure.grade
                feeStruct_dict['date_posted'] = feeStructure.created
                all_feeStruct_components = FeeStructureComponent.objects.filter(feeStructureParent = feeStructure)
                total_amount = sum(component.amount for component in all_feeStruct_components)
                feeStruct_dict['total_amount'] = total_amount
                feeStructures_list.append(feeStruct_dict)
            self.response.setStatusCode(status.HTTP_200_OK)
            self.response.setMessage(f"{self.queryset.count()} Fee Structures Found!")
            self.response.setEntity(feeStructures_list)
            return Response(self.response.toDict(), status=self.response.status)
        except:
            return self.api_response('Error Retreaving Fee Structures!',status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=True, methods=['get'],url_path='get_fee_structure')
    def get_feeStructure(self, request, id=None):
        fee_structure = FeeStructure.objects.get(fee_struct_id = id)
        fee_structure_dict = {}
        terms_list = ['Term 1','Term 2','Term 3']

        try:

            fee_structure_dict['title'] = fee_structure.title
            fee_structure_dict['year'] = fee_structure.year
            fee_structure_dict['grade'] = fee_structure.grade
            all_feeStruct_components = FeeStructureComponent.objects.filter(feeStructureParent = fee_structure)
            total_amount = sum(component.amount for component in all_feeStruct_components)
            fee_structure_dict['total_amount'] = total_amount
            empty_term_list = []

            for term in terms_list:
                term_object = {}
                component_list = []
                components_queryset = FeeStructureComponent.objects.filter(feeStructureParent = fee_structure,term = term)
                for component in components_queryset:
                    component_dict = {}
                    component_dict['description'] = component.description
                    component_dict['amount'] = component.amount
                    component_dict['deadline'] = component.deadline.strftime('%Y-%m-%d')
                    component_list.append(component_dict)
                term_object['term'] = term
                term_object['items'] = component_list
                empty_term_list.append(term_object)

            fee_structure_dict['terms'] = empty_term_list
            self.response.setStatusCode(status.HTTP_200_OK)
            self.response.setMessage(f"{fee_structure.title} retreaved succesfully!")
            self.response.setEntity(fee_structure_dict)
            return Response(self.response.toDict(), status=self.response.status)
        
        except:
            return self.api_response('Error Retreaving Fee Structure!',status.HTTP_500_INTERNAL_SERVER_ERROR)

class FeeStructureComponentViewSet(viewsets.ModelViewSet):
    queryset = FeeStructureComponent.objects.all()
    serializer_class = FeeStructureComponentSerializer

    def api_response(self, message, status_code):
        return Response(
            ApiResponse(message=message, status=status_code).toDict(),
            status=status_code
        )    