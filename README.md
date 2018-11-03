# node-SW10
[<img src="https://img.shields.io/badge/Node.js-4.x%20through%207.x-brightgreen.svg">](https://nodejs.org) 

[<img src="https://cdn.shopify.com/s/files/1/1734/1465/products/SW10_V1.0.0_Front_1800x1800.JPG?v=1540629404" width="300" align="right">](https://xinabox.cc/products/sw10)

Welcome to node-SW10, a Node.js I2C module for the NXP Semiconductors LM75 Sensor. XinaBox sells a [xChip SW10](https://xinabox.cc/products/SW10) and [here is the datasheet](https://www.nxp.com/docs/en/data-sheet/LM75B.pdf).

This module uses [i2c-bus](https://github.com/fivdi/i2c-bus) which should provide access with Node.js on Linux boards like the Raspberry Pi Zero, 1, 2, or 3, BeagleBone, BeagleBone Black, or Intel Edison.

Since node-SW10 needs to talk directly to the I2C bus and requires access to /dev/i2c, you will typically need run Node with elevated privileges or add your user account to the i2c group: ```$ sudo adduser $USER i2c```