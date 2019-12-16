from django.shortcuts import render, redirect, reverse, HttpResponse
from .models import User
from apps.dashboard.models import Job
from django.contrib import messages
import bcrypt

# Create your views here.
def index(request):
    return render(request,'login/index.html')

def register(request):
    errors = User.objects.registration_validator(request.POST)
    if len(errors) > 0:
        for key,value in errors.items():
            messages.error(request,value,extra_tags="register")
        return redirect(reverse('login:home'))
    
    else:
        User.objects.create(
            first_name=request.POST['first_name'],
            last_name=request.POST['last_name'],
            email=request.POST['email'],
            password=bcrypt.hashpw(request.POST['password'].encode(),bcrypt.gensalt())
        )
        request.session['user_id'] = User.objects.last().id
        request.session['logged_in'] = True
        return redirect(reverse('login:dashboard'))

def login(request):
    errors,user_id = User.objects.login_validator(request.POST)
    if len(errors) > 0:
        for key,value in errors.items():
            messages.error(request,value,extra_tags="login")
        return redirect(reverse('login:home'))

    else:
        request.session['user_id'] = user_id
        request.session['logged_in'] = True
        return redirect(reverse('login:dashboard'))

def guest(request):
    request.session['guest'] = True
    request.session['logged_in'] = True
    return redirect(reverse('login:dashboard'))

def logout(request):
    request.session.clear()
    print(request.session)
    return redirect(reverse('login:home')) 

def dashboard(request):
    if 'logged_in' in request.session:
        if 'guest' in request.session:
            user = User.objects.get(email = 'guest@email.com')
        else:
            user = User.objects.get(id=int(request.session['user_id']))
        context = {
            'first_name': user.first_name,
            'jobs': Job.objects.all(),
            'user_jobs': user.jobs_added.all()
        }
        return render(request,'login/dashboard.html',context)
    else:
        return redirect(reverse('login:home'))