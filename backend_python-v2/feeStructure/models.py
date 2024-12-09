from django.db import models
from datetime import datetime

# Create your models here.

class FeeStructure(models.Model):

    grades = [
        ('Grade 1', 'Grade 1'),
        ('Grade 2', 'Grade 2'),
        ('Grade 3', 'Grade 3'),
        ('Grade 4', 'Grade 4'),
        ('Grade 5', 'Grade 5'),
        ('Grade 6', 'Grade 6'),
        ('Grade 7', 'Grade 7'),
        ('Grade 8', 'Grade 8'),
        ('Grade 9', 'Grade 9'),
    ]

    fee_struct_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, default='Title')
    year = models.CharField(max_length=5, default=str(datetime.now().year))
    grade = models.CharField(max_length=8,choices=grades,default='Grade 1')
    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)

class FeeStructureComponent(models.Model):

    term = [
        ('Term 1','Term 1'),
        ('Term 2','Term 2'),
        ('Term 3','Term 3')
    ]

    feeStructureParent = models.ForeignKey(FeeStructure, on_delete=models.CASCADE, null=True,)
    fee_struct_component_id = models.AutoField(primary_key=True)
    description = models.TextField(default='Description')
    amount = models.DecimalField(max_digits=10, decimal_places=3, default=0.00)
    term = models.CharField(max_length=6,choices=term,default='Term 1')
    deadline = models.DateTimeField()
    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)
