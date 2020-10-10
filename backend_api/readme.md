## CORS configuration

Install from **pip** in your environment:

```
pip install django-cors-headers

```


and then add it to your installed apps in settings.py file:

```python

INSTALLED_APPS = [
        ...
        'corsheaders',
        ...
    ]

```

    

Configure a middleware class to listen to responses in settings.py file:

```python

    MIDDLEWARE = [
        ...
        'corsheaders.middleware.CorsMiddleware',
        'django.middleware.common.CommonMiddleware',
        ...
    ]

```



Then add allowed origins in the settins.py file:

``` python

CORS_ALLOW_ALL_ORIGINS = False


CORS_ALLOWED_ORIGINS = [
    "http://yourallowedorigin.com",
    "https://yourallowedorigin2.com",
]

```