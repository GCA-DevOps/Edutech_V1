from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import StudentsParentsView
router = DefaultRouter()
router.register(r'', StudentsParentsView, basename='')


urlpatterns = [
    # path('', include(router.urls)),
    path('students-balance-by-parent/<str:parent_idno>/',StudentsParentsView.as_view({'get': 'students_by_parent'}),
         name='students_by_parent'),

    path('students-info-by-parent/<str:parent_idno>/',StudentsParentsView.as_view({'get': 'student_by_parent'}),
         name='student_by_parent'),
]


