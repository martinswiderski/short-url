var url,
    urlParse      = require('url-parse'),
    md5sign       = require('md5'),
    sha1sign      = require('sha1'),
    unixTime      = require('unix-time'),
    urlParse      = require('url-parse'),
    short         = require('./short');

    //var configuration = require('./configuration');;


String.prototype.allReplace = function(replace) {
    var retStr = this;
    for (var subject in replace) {
        retStr = retStr.replace(new RegExp(subject, 'g'), replace[x]);
    }
    return retStr;
};

url = function url() {

    /**
     * Blank URL template
     * @type {string}
     */
    this.template = '{"href":"","protocol":"","username":"","password":"","auth":"","host":"","hostname":"","port":"","pathname":"","query":"","hash":""}';

    /**
     * Short URL length
     * @type {int}
     */
    this.len = 4;

    this.decomposeQuery = function (query, replace) {

        return 'PLACEHOLDER';
    },


    /**
     * Takes URL if valid and breaks it down to pieces
     * @param string url
     * @returns {} processed URL if valid URL
     */
    this.details = function (string) {
        var processed = {};
        if (/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(string)) {
            processed = urlParse(string);
        } else {
            processed = JSON.parse(this.template);
        }
        delete processed['href'];
        return processed;
    },

    this.process = function (string) {

        var details = this.details(string),
            date = new Date();

        var full = {
                url: string,
                strlen: string.length,
                short: short.generate(this.len),
                md5: md5sign(string),
                sha1: sha1sign(string),
                timestamp: date,
                unix: unixTime(date),
                is_url: (details.protocol !== '' && details.host !== ''),
                url_details: details,
                originator: {
                    ip: 'not-implemented-yet'
                }
            };

        return full;
    };
};

module.exports = new url();
