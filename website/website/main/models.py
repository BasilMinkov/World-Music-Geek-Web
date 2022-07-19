from django.db import models

class Post(models.Model):
    post_title = models.CharField(max_length=150)
    post_content = models.TextField(blank=True)  # Данное поле не является обязательным к заполнению
    post_create = models.DateTimeField()  # Дата создания новости единовременно
    post_edit = models.DateTimeField(auto_now=True)  # Данное поле будет обновлять постоянно
    post_photo = models.ImageField(upload_to='photos/%Y/%m/%d/')  # Провалидирует, что файл - картинка.
    post_is_published = models.BooleanField(default=True)