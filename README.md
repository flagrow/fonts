# Fonts by ![flagrow logo](https://avatars0.githubusercontent.com/u/16413865?v=3&s=20) [flagrow](https://discuss.flarum.org/d/1832-flagrow-extension-developer-group), a project of [Gravure](https://gravure.io/).

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/flagrow/fonts/blob/master/LICENSE.md)
[![Latest Stable Version](https://img.shields.io/packagist/v/flagrow/fonts.svg)](https://packagist.org/packages/flagrow/fonts)
[![Total Downloads](https://img.shields.io/packagist/dt/flagrow/fonts.svg)](https://packagist.org/packages/flagrow/fonts)
[![Donate](https://img.shields.io/badge/patreon-support-yellow.svg)](https://www.patreon.com/flagrow)

Easily add Google Fonts to your Flarum install.

## Install

    composer require flagrow/fonts

Don't have Composer on your server ? You can also install it with [Bazaar](https://github.com/flagrow/bazaar).

## Usage

Before you start using the extension, create a [Google Fonts API Key](https://developers.google.com/fonts/docs/developer_api#identifying_your_application_to_google) and save it in the extension settings (you should automatically get a prompt after enabling the extension).

Go to the Admin panel > Fonts to enable fonts.

Use them in your posts with the `[font]` BBCode. For example:

    [font=Fresca]Hello World[/font]

**Don't forget**: adding many fonts will increase your website size and load time.
Keep them to a minimum.

## Support our work

We prefer to keep our work available to everyone.
In order to do so we rely on voluntary contributions on [Patreon](https://www.patreon.com/flagrow).
