/*jsonUrl = 'http://localhost:3000/js/data.json';*/

var ourData = {
    "settings" : {
        "author": "Harry Potter",
        "location": "UK"
    },
    "items": [
        {
          "header": "1",
          "text": "11"
        },
        {
          "header": "2",
          "text": "22"
        }
    ]
};

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

ReactDOM.render(
    <JsonReactApplication data={ourData} />,
        document.getElementById('root')
    );
