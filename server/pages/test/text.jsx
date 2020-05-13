import Draft from 'draft-js';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg';

const emptyContentState = Draft.convertFromRaw({
    entityMap: {},
    blocks: [
      {
        text: '',
        key: 'foo',
        type: 'unstyled',
        entityRanges: [],
      },
    ],
  });
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          editorState: EditorState.createWithContent(emptyContentState).getCurrentContent(),
        };
        this.onChange = (editorState) => this.setState({editorState});
      }
  
      render() {
        //const Editor = Draft.Editor;
        const editorState = this.state.editorState;
        return (
          <div style={{border: '1px solid black', padding: 10}}>
            <Editor

            />
          </div>
        );
      }
  }

  export default MyComponent;