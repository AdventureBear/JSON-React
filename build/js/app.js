var Settings = React.createClass({
    displayName: 'Settings',

    render: function () {
        var author = this.props.data.author,
            location = this.props.data.location;
        return React.createElement(
            'header',
            null,
            React.createElement(
                'h1',
                null,
                author
            ),
            React.createElement(
                'em',
                null,
                location
            )
        );
    }
});

var SingleItem = React.createClass({
    displayName: 'SingleItem',

    render: function () {
        var header = this.props.data.header,
            text = this.props.data.text;
        return React.createElement(
            'li',
            null,
            React.createElement(
                'h3',
                null,
                header
            ),
            React.createElement(
                'p',
                null,
                text
            )
        );
    }
});

var JsonReactApplication = React.createClass({
    displayName: 'JsonReactApplication',

    // this component must know and use JSON's structure

    render: function () {
        var settings = this.props.data.settings,
            items = this.props.data.items;
        var itemsTemplate;

        if (items.length > 0) {
            itemsTemplate = items.map(function (item, index) {
                return React.createElement(SingleItem, { data: item, key: index });
            });
        } else {
            itemsTemplate = React.createElement(
                'p',
                null,
                'No items presented on the source'
            );
        }

        return React.createElement(
            'section',
            null,
            React.createElement(Settings, { data: settings }),
            React.createElement(
                'ul',
                null,
                itemsTemplate
            )
        );
    }
});

var renderAll = function (obj) {
    ReactDOM.render(React.createElement(JsonReactApplication, { data: obj }), document.getElementById('root'));
};

getObjectFromURL = function (url, callback) {
    // This function passes data object 
    // to a given callback function
    var xhr;
    xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.onreadystatechange = function () {
        // Executed many times, because we can't have HTTP 200 immediately.
        // that's why we must check everything
        var status = xhr.status,
            response = xhr.responseText;
        newObject = {};

        if (xhr.readyState !== 4) {
            return false;
        }

        if (status !== 200) {
            console.warn('Error, status code: ' + status);
            return false;
        }

        try {
            var newObject = JSON.parse(response);
            console.info('We got object!');
            console.info(newObject);
            callback(newObject); // callback is executed
        } catch (err) {
            console.warn('That\'s not a proper JSON.');
            console.warn(response);
        }
    };
    // This code will be executed 1 time, 
    // even before server's response.
    // That's why we should not return anything
    xhr.send();
};

// this works everywhere
var jsonUrl = 'test/test-data.json';

// this line works only if i am running App on codekitchen.ru
// you can chackit on http://codekitchen.ru
// var jsonUrl = 'http://codekitchen.ru/json-test/real-file.json';


// here program actually starts
getObjectFromURL(jsonUrl, renderAll);