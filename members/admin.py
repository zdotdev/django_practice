from django.contrib import admin
from .models import Member

# Register your models here.
class MemberAdmin(admin.ModelAdmin):
    list_display = ('firstName', 'lastName', 'phone', 'join_date')
    
admin.site.register(Member)