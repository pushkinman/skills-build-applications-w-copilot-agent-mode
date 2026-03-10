from djongo import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # Extend as needed for profile fields
    pass

class Team(models.Model):
    name = models.CharField(max_length=100)
    members = models.ArrayReferenceField(to=User, on_delete=models.CASCADE)

class Activity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=50)
    duration = models.IntegerField()
    date = models.DateField()

class Leaderboard(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    points = models.IntegerField()

class Workout(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    suggestion = models.TextField()
    date = models.DateField()
