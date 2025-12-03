FROM php:8.2-apache

# Set working directory
WORKDIR /var/www/html

# Copy source code
COPY . /var/www/html

# Enable Apache rewrite module
RUN a2enmod rewrite

# OpenShift runs as random UID; make files readable/writable
RUN chmod -R 755 /var/www/html

# Use a high port for Apache so non-root user can bind
ENV APACHE_RUN_USER=apache \
    APACHE_RUN_GROUP=apache \
    APACHE_PID_FILE=/var/run/apache2.pid \
    APACHE_RUN_DIR=/var/run/apache2 \
    APACHE_LOG_DIR=/var/log/apache2 \
    PORT=8080

# Tell Apache to listen on 8080
RUN sed -i 's/Listen 80/Listen 8080/' /etc/apache2/ports.conf
RUN sed -i 's/:80>/:8080>/' /etc/apache2/sites-available/000-default.conf

EXPOSE 8080

CMD ["apache2-foreground"]
