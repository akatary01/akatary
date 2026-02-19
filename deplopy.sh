sudo rm -rf /var/www/akatary_2.0
sudo mkdir /var/www/akatary_2.0

shopt -s extglob
sudo cp -r !(api) /var/www/akatary_2.0/

sudo systemctl restart apache2