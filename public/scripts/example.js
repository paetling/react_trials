/**
 * This file provided by Facebook is for non-commercial testing and evaluation purposes only.
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var CommentList = React.createClass({
  render: function(){
    var commentNodes = this.props.data.map(function (comment){
      return (
        <Comment author={comment.author}>{comment.text}</Comment>
      )
    })

    return(
      <div className='commentList'>
        {commentNodes}
      </div>
    )
  }
})

var CommentForm = React.createClass({
  handleSubmit: function(e){
    e.preventDefault()
    console.log('clearing')
    console.log(this.refs)
    var author = this.refs.author.getDOMNode().value.trim()
    var text = this.refs.text.getDOMNode().value.trim()
    if (!text || !author){
      return
    }
    this.props.onCommentSubmit({author:author, text:text})
    this.refs.author.getDOMNode().value = ''
    this.refs.text.getDOMNode().value = ''
  },
  render: function() {
    return(
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your Name..." ref="author"></input>
        <input type="text" placeholder="Your Comment ..." ref="text"></input>
        <input type="submit" value="post"></input>
      </form>
      )
  }
})

var Comment = React.createClass({
  render: function(){
    console.log('properties')
    console.log(this.props)
    return(
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    )
  }
})

var CommentBox = React.createClass({
  displayName: 'CommentBox',
  getInitialState: function(){
    return {data: []}
  },
  loadCommentsFromServer: function(){
    $.ajax({
      url:this.props.url,
      dataType: 'json',
      success: function(data){
        this.setState({data: data})
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    })
  },
  componentDidMount: function(){
    console.log('trying to get facts from server')
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval)
  },
  render: function(){
    return(
    <div className="commentBox">
      <h1>Comments! {this.state.data.length} Number of Comments</h1>
      <CommentList data={this.state.data}/>
      <CommentForm onCommentSubmit={this.handleCommentSubmit} />
    </div>
    )
  },
  handleCommentSubmit: function(comment){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
})

React.render(<CommentBox url="comments.json" pollInterval={5000} />, document.getElementById('content'))
