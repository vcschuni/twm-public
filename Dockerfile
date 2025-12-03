# Use official PHP + Apache image
FROM php:8.2-apache

# Set working directory
WORKDIR /var/www/html

# Copy source code into container
COPY . /var/www/html

# Enable Apache rewrite module
RUN a2enmod rewrite

# Set proper permissions (optional)
RUN chown -R www-data:www-data /var/www/html

# Expose HTTP port
EXPOSE 8080

# Start Apache in foreground
CMD ["apache2-foreground"]
