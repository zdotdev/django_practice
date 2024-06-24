from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Member

# Create your views here.
def test (request):
    template = loader.get_template('test.html')
    return HttpResponse(template.render())
def index (request):
    template = loader.get_template('index.html')
    return HttpResponse(template.render())

def main (request):
    template = loader.get_template('main.html')
    return HttpResponse(template.render())

def members (request):
    myMembers = Member.objects.all().values()
    template = loader.get_template('all_members.html')
    context = {
        'myMembers': myMembers,
    }
    return HttpResponse(template.render(context, request))

def details (request, id):
    myMember = Member.objects.get(id=id)
    template = loader.get_template('details.html')
    context = {
        'myMember': myMember,
    }
    return HttpResponse(template.render(context, request))

def testing (request):
    template = loader.get_template('template.html')
    context = {
        'fruits': ['apple', 'banana', 'cherry', 'date', 'elderberry'],
        'pipol': 'Zedrick'
    }
    return HttpResponse(template.render(context, request))