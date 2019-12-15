from django.db import models
from apps.login.models import User
import re
# Create your models here.
class JobManager(models.Manager):
    def job_validator(self,postData):
        errors={}
        if len(postData['title']) < 3:
            if len(postData['title']) == 0:
                errors['title'] = "A job title is required."
            else:
                errors['title'] = "Job title must be at least 3 characters."

        if len(postData['description']) < 3:
            if len(postData['description']) == 0:
                errors['description'] = "A job description is required."
            else:    
                errors['description'] = "Job description must be at least 3 characters."
        
        if len(postData['location']) < 3:
            if len(postData['location']) == 0:
                errors['location'] = "A job location is required."
            else:
                errors['location'] = "Job location must be at least 3 characters."

        cat = False
        for category in Category.objects.all():
            if category.category in postData:
                cat = True
        if cat == False:
            if len(postData['new_category']) ==  0:
                errors['category'] = "A category is required."
        return errors

class Job(models.Model):
    title = models.CharField(max_length=45)
    description = models.TextField()
    location = models.CharField(max_length=255)
    created_by = models.ForeignKey(User,related_name="jobs_created")
    added_by = models.ManyToManyField(User,related_name="jobs_added")
    objects = JobManager()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Category(models.Model):
    category = models.CharField(max_length=45)
    job = models.ManyToManyField(Job,related_name="categories")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)