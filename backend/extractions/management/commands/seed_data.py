from django.core.management.base import BaseCommand
from faker import Faker
from extractions.models import Extraction

class Command(BaseCommand):
    help = "Seed the database with fake extraction rows"

    def handle(self, *args, **kwargs):
        fake = Faker()
        rows = []
        for i in range(200):
            rows.append(
                Extraction(
                    name=fake.name(),
                    email=fake.email(),
                    age=fake.random_int(min=18, max=65),
                )
            )
        Extraction.objects.bulk_create(rows)
        self.stdout.write(self.style.SUCCESS("Successfully seeded 200 rows"))
