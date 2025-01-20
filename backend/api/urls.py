from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.note_list_create, name="note-list"),
    path("notes/delete/<int:pk>/", views.note_delete, name="delete-note"),
     path('notes/update/<int:pk>/', views.note_update, name='note-update'),
     path('user/info/', views.get_user_info, name='user-info'),   
]
