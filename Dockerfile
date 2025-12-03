FROM php:8.2-apache
WORKDIR /var/www/html
COPY . /var/www/html
RUN a2enmod rewrite
RUN chmod -R 755 /var/www/html

# Configure Apache to use 8080
ENV PORT=8080
RUN sed -i 's/Listen 80/Listen 8080/' /etc/apache2/ports.conf
RUN sed -i 's/:80>/:8080>/' /etc/apache2/sites-available/000-default.conf

EXPOSE 8080
CMD ["apache2-foreground"]
