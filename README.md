# Fonts by ![Flagrow logo](https://avatars0.githubusercontent.com/u/16413865?v=3&s=20) [Flagrow](https://discuss.flarum.org/d/1832-flagrow-extension-developer-group), a project of [Gravure](https://gravure.io/)

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/flagrow/fonts/blob/master/LICENSE.md) [![Latest Stable Version](https://img.shields.io/packagist/v/flagrow/fonts.svg)](https://packagist.org/packages/flagrow/fonts) [![Total Downloads](https://img.shields.io/packagist/dt/flagrow/fonts.svg)](https://packagist.org/packages/flagrow/fonts) [![Donate](https://img.shields.io/badge/patreon-support-yellow.svg)](https://www.patreon.com/flagrow) [![Join our Discord server](https://discordapp.com/api/guilds/240489109041315840/embed.png)](https://flagrow.io/join-discord)

Easily add Google Fonts to your Flarum install.

> Note: To work around an [issue with Flarum](https://github.com/flagrow/fonts/issues/4), we disable horizontal scrolling of editor controls on mobile.
> This could make it impossible to access some buttons while on a narrow screen.

## Install

Use [Bazaar](https://discuss.flarum.org/d/5151-flagrow-bazaar-the-extension-marketplace) or install manually:

    composer require flagrow/fonts

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

## Security

If you discover a security vulnerability within Fonts, please send an email to the Gravure team at security@gravure.io. All security vulnerabilities will be promptly addressed.

Please include as many details as possible. You can use `php flarum info` to get the PHP, Flarum and extension versions installed.

## Links

- [Flarum Discuss post](https://discuss.flarum.org/d/6207-flagrow-fonts-easily-add-fonts-to-your-forum)
- [Source code on GitHub](https://github.com/flagrow/fonts)
- [Report an issue](https://github.com/flagrow/fonts/issues)
- [Download via Packagist](https://packagist.org/packages/flagrow/fonts)

An extension by [Flagrow](https://flagrow.io/), a project of [Gravure](https://gravure.io/).
