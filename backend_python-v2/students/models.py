import uuid

from django.db import models
class Students(models.Model):
    id = models.AutoField(primary_key=True)
    uniqueId = models.CharField(max_length=50, unique=True, blank=True)
    admNumber = models.CharField(max_length=255)
    schoolCode = models.CharField(max_length=50, null=True, blank=True)
    firstName = models.CharField(max_length=255)
    middleName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    studentGender = models.CharField(max_length=255)
    dob = models.DateField()
    dateOfAdmission = models.DateField(auto_now_add=True)
    healthStatus = models.CharField(max_length=255, null=True, blank=True)
    grade = models.IntegerField()
    stream = models.CharField(max_length=255)
    schoolStatus = models.CharField(max_length=255, null=True, blank=True)
    dormitory = models.CharField(max_length=255, null=True, blank=True)
    parentID = models.IntegerField()
    upiNumber = models.CharField(max_length=255)
    urls = models.CharField(max_length=500)

    def save(self, *args, **kwargs):
        if not self.admNumber:
            self.admNumber = self.generate_admission_number()
        if not self.uniqueId:
            self.uniqueId = self.generate_unique_id()
        super(Students, self).save(*args, **kwargs)

    def generate_admission_number(self):
        # Generate a unique admission number (e.g., UUID)
        return str(uuid.uuid4()).split('-')[0]

    def generate_unique_id(self):
        # Combine the school code with the admission number to generate a unique ID
        return f'{self.schoolCode}-{self.admNumber}'



    def __str__(self):
        return f"{self.firstName} {self.middleName} {self.lastName}"

    class Meta:
        db_table = 'students'  # Optional: specify the database table name

class StudentAccount(models.Model):
    student = models.OneToOneField(Students, on_delete=models.CASCADE)
    debit = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    credit = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    date = models.DateField(auto_now_add=True)

    @property
    def balance(self):
        # Calculate the balance
        return self.debit - self.credit

    def _str_(self):
        # Return a string representation of the object
        return f"Student: {self.student}, Balance:{self.balance}"

