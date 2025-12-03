FROM php:8.2-apache
WORKDIR /var/www/html
COPY . /var/www/html
RUN a2enmod rewrite
RUN chown -R www-data:www-data /var/www/html
EXPOSE 8080
ENV PORT=8080
CMD ["apache2-foreground"]
