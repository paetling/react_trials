var MainPage = React.createClass({
    render: function(){
        return(
            <div>
                <div>Alexs WEBSITE</div>
                <img src="images/alex_picture.png" />
                <AlexFacts url="facts.json"/>
            </div>
        )
    }
})

var AlexFacts = React.createClass({
    getInitialState: function(){
        return {fact: "Alex is Boring He has no facts"}
    },
    getFacts: function(){
        $.ajax({
            url:this.props.url,
            dataType: 'json',
            success: function(data){
                this.setState(data)
            }.bind(this),
            error: function(xhr, status, err){
                console.error(this.props.url, status, err.toString())
            }.bind(this)
        })
    },
    componentDidMount: function(){
        this.getFacts()
        setInterval(this.getFacts, 1000)
    },
    render: function(){
        return(
            <div>
                <div>Facts About Alex:  {this.state.fact} </div>
                <div>Length of the fact: {this.state.fact.length} </div>
            </div>
        )
    }
})

React.render(<MainPage />, document.getElementById('content'))



