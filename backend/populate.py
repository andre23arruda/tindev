import os, django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'setup.settings')
django.setup()

from nlw1.models import CollectItem
from django.core.files import File

collect_items_list = [
    {
        'image': './images/baterias.svg',
        'name': 'Baterias',
    },
    {
        'image': './images/eletronicos.svg',
        'name': 'Eletrônicos',
    },
    {
        'image': './images/lampadas.svg',
        'name': 'Lâmpadas',
    },
    {
        'image': './images/oleo.svg',
        'name': 'Óleo de cozinha',
    },
    {
        'image': './images/organicos.svg',
        'name': 'Resíduos orgânicos',
    },
    {
        'image': './images/papeis-papelao.svg',
        'name': 'Papéis e papelão',
    },
]

def populate_collect_items():
    for item in collect_items_list:
        image = File(open(item['image'],'r'))
        obj = CollectItem.objects.create(name=item['name'])
        obj.image = image
        obj.save()
    print('Deu bom :)')

if __name__ == '__main__':
    populate_collect_items()
