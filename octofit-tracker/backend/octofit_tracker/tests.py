from rest_framework.test import APITestCase
from .models import User, Team, Activity, Leaderboard, Workout

class UserTest(APITestCase):
    def test_create_user(self):
        user = User.objects.create_user(username='testuser', password='testpass')
        self.assertEqual(User.objects.count(), 1)

class TeamTest(APITestCase):
    def test_create_team(self):
        user = User.objects.create_user(username='testuser', password='testpass')
        team = Team.objects.create(name='Test Team')
        team.members.add(user)
        self.assertEqual(Team.objects.count(), 1)

class ActivityTest(APITestCase):
    def test_create_activity(self):
        user = User.objects.create_user(username='testuser', password='testpass')
        activity = Activity.objects.create(user=user, type='run', duration=30, date='2023-01-01')
        self.assertEqual(Activity.objects.count(), 1)

class LeaderboardTest(APITestCase):
    def test_create_leaderboard(self):
        team = Team.objects.create(name='Test Team')
        leaderboard = Leaderboard.objects.create(team=team, points=100)
        self.assertEqual(Leaderboard.objects.count(), 1)

class WorkoutTest(APITestCase):
    def test_create_workout(self):
        user = User.objects.create_user(username='testuser', password='testpass')
        workout = Workout.objects.create(user=user, suggestion='Pushups', date='2023-01-01')
        self.assertEqual(Workout.objects.count(), 1)
