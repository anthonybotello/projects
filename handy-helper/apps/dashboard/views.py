from django.shortcuts import render, redirect,reverse
from apps.login.models import User
from .models import Job, Category
from django.contrib import messages

# Create your views here.
def new_job(request):
    if 'logged_in' in request.session:
        user = User.objects.get(id=int(request.session['user_id']))
        context = {
            'first_name': user.first_name,
            'id': user.id,
            'categories': Category.objects.all()
        }
        return render(request,'dashboard/new_job.html',context)
    else:
        return redirect(reverse('login:home'))

def create_job(request):
    if 'logged_in' in request.session:
        print(request.POST)
        errors = Job.objects.job_validator(request.POST)
        if len(errors) > 0:
            for key,value in errors.items():
                messages.error(request,value)
            if request.POST['request_type'] == "new":
                return redirect(reverse('jobs:new'))
            elif request.POST['request_type'] == "update":
                job_id = request.POST['job_id']
                return redirect(reverse('jobs:edit',kwargs={'job_id':job_id}))
        else:
            if request.POST['request_type'] == "new":
                Job.objects.create(title=request.POST['title'],
                description=request.POST['description'],
                location=request.POST['location'],
                created_by=User.objects.get(id=int(request.session['user_id']))
                )
                for category in Category.objects.all():
                    if f'{category.category}' in request.POST:
                        Job.objects.last().categories.add(category)
                if len(request.POST['new_category']) > 0:
                    Category.objects.create(category=request.POST['new_category'])
                    Job.objects.last().categories.add(Category.objects.last())
            elif request.POST['request_type'] == "update":
                job = Job.objects.get(id=int(request.POST['job_id']))
                job.title = request.POST['title']
                job.description = request.POST['description']
                job.location = request.POST['location']
                job.save()
            return redirect(reverse('login:dashboard'))
    else:
        return redirect(reverse('login:home'))

def edit_job(request,job_id):
    if 'logged_in' in request.session:
        user = User.objects.get(id=int(request.session['user_id']))
        context = {
            'first_name': user.first_name,
            'id': user.id,
            'job': Job.objects.get(id=int(job_id))
        }
        if context['id'] != context['job'].created_by.id:
            return redirect(reverse('login:dashboard'))
        else:
            return render(request,'dashboard/job_edit.html',context)
    else:
        return redirect(reverse('login:home'))

def job_info(request,job_id):
    if 'logged_in' in request.session:
        user = User.objects.get(id=int(request.session['user_id']))
        context = {
            'first_name': user.first_name,
            'id': user.id,
            'job': Job.objects.get(id=int(job_id)),
            'user_jobs': user.jobs_added.all(),
            'categories': Job.objects.get(id=int(job_id)).categories.all()
        }
        return render(request,'dashboard/job_info.html',context)
    else:
        return redirect(reverse('login:home'))

def job_remove(request,job_id):
    if 'logged_in' in request.session:
        job = Job.objects.get(id=int(job_id))
        job.delete()
        return redirect(reverse('login:dashboard'))
    else:
        return redirect(reverse('login:home'))

def add_job(request,job_id):
    if 'logged_in' in request.session:
        job = Job.objects.get(id=int(job_id))
        user = User.objects.get(id=int(request.session['user_id']))
        if job not in user.jobs_added.all():
            user.jobs_added.add(job)
        return redirect(reverse('login:dashboard'))
    else:
        return redirect(reverse('login:home'))

def quit_job(request,job_id):
    if 'logged_in' in request.session:
        job = Job.objects.get(id=int(job_id))
        user = User.objects.get(id=int(request.session['user_id']))
        if job in user.jobs_added.all():
            user.jobs_added.remove(job)
        return redirect(reverse('login:dashboard'))
    else:
        return redirect(reverse('login:home'))