var Settings = React.createClass({
    render: function() {
        var author = this.props.data.author,
        location = this.props.data.location;
        return (
            <header>
                <h1>{author}</h1>
                <em>{location}</em>
            </header>
            )
    }
});

var SingleItem = React.createClass({
    render: function() {
        var header = this.props.data.header,
        text = this.props.data.text;
        return (
            <li >
                <h3>{header}</h3>
                <p>{text}</p>
            </li>
            )
    }
});


var JsonReactApplication = React.createClass({
    // this component must know and use JSON's structure

    render: function() {
        var settings = this.props.data.settings,
            items = this.props.data.items;
        var itemsTemplate;

        if (items.length > 0) {
            itemsTemplate = items.map(function(item, index) {
                return (
                    <SingleItem data={item} key={index} />
                    )
            })
        } else {
            itemsTemplate = <p>No items presented on the source</p>
        }

        return (
            <section>
                <Settings data={settings}/>
                <ul>
                    {itemsTemplate}
                </ul>
            </section>
            );
    }
});

var renderAll = function (obj) {
  ReactDOM.render(
    <JsonReactApplication data={obj} />,
        document.getElementById('root')
    );
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

