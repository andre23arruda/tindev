from pathlib import Path
from corsheaders.defaults import default_headers
import os, sys, json

from setup import env

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve(strict=True).parent.parent

SECRET_KEY = os.environ['SECRET_KEY']
DEBUG = os.environ['DEBUG']
ALLOWED_HOSTS = json.loads(os.environ['ALLOWED_HOSTS'])

# LOGGING_CONFIG = None

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # third party apps
    'channels',
    'rest_framework',
    'django_filters',
    'corsheaders',
    'rangefilter',
    # my apps
    'tindev',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.locale.LocaleMiddleware',
]

ROOT_URLCONF = 'setup.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'setup.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    { 'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator', },
]

# time zone and language
LANGUAGE_CODE = os.environ['LANGUAGE_CODE']
TIME_ZONE = os.environ['TIME_ZONE']
USE_I18N = True
USE_L10N = True
USE_TZ = True

# static and media
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'static'
STATICFILES_DIRS = [ BASE_DIR, 'setup/static' ]
MEDIA_URL = '/media/nlw_2/'
MEDIA_ROOT = BASE_DIR / 'media/nlw_2/'
BASE_URL = os.environ['BASE_URL']

# apps folder
sys.path.insert(0, os.path.join(BASE_DIR, 'apps'))

# api configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [ # autenticação
        'rest_framework.authentication.SessionAuthentication'
    ],
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.QueryParameterVersioning', # versionamento
}

# CORS
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
]
CORS_ALLOW_HEADERS = list(default_headers) + [
    'user',
    'UserID',
]

# locale
LOCALE_PATHS = [ BASE_DIR, 'locale' ]

# channels
ASGI_APPLICATION = "setup.asgi.application"
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer',
        # 'CONFIG': {
        #     "channel_capacity": {
        #         "http.request": 5,
        #     },
            # 'capacity': 3,
            # 'expiry': 5,
            # 'group_expiry': 10
        # },
    },
}
