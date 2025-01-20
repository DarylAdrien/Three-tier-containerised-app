from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .serializers import UserSerializer, NoteSerializer
from .models import Note

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def note_list_create(request):
    if request.method == 'GET':
        user = request.user
        notes = Note.objects.filter(author=user)
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    data = {
        'username': user.username
    }
    return Response(data)

@api_view(['PUT','GET'])
@permission_classes([IsAuthenticated])
def note_update(request, pk):
    if request.method == 'PUT':
        note = Note.objects.get(pk=pk, author=request.user)
        serializer = NoteSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
    if request.method == "GET":
        note = Note.objects.get( pk=pk, author=request.user)
        serializer = NoteSerializer(note)
        return Response(serializer.data)



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def note_delete(request, pk):
    note = Note.objects.get(pk=pk, author=request.user)
    note.delete()
    return Response()


@api_view(['POST'])
@permission_classes([AllowAny])
def create_user(request):
    
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
