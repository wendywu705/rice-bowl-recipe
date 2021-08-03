import { 
  StyleSheet, 
  Font 
} from '@react-pdf/renderer';


Font.register({ 
  family: 'Abel', 
  src: __dirname + 'Abel-Regular.ttf',
  fontStyle: 'normal',
  fontWeight: 'normal'
});
  
Font.register({
  family: 'UnicaOne',
  src: __dirname + 'UnicaOne-Regular.ttf',
  fontStyle: 'normal',
  fontWeight: 'normal'
});
  
const styles = StyleSheet.create({
  page: {
    fontFamily: 'UnicaOne',
    display: 'block',
    padding: '30 20 30 20'
  },
  title: {
    textAlign: 'center', 
    fontSize:30,
    borderTop: 1,
    borderBottom: 1,
    paddingTop: 7,
    paddingBottom: 5,
    marginTop:5,
    marginBottom:15,
    flex:1,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  view: {
    height: 3508,
    width:2480,
    backgroundColor:'#FFFFFF'
  },
  column: {
    width: 300,
    marginLeft: 20,
    lineHeight: 1.3,
    fontFamily: 'Abel',
    left:0,
  },
  subheader: {
    fontSize:25,
    fontFamily: 'UnicaOne',
  },
  timeContainer: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    paddingBottom:10
  },
  time: {
    textAlign:'center',
    width: 130,
    paddingLeft:10,
    paddingRight:10
  },
  timeNumber: {
    fontFamily: 'UnicaOne',
    fontSize: 20
  },
  timeTitle: {
    fontSize: 15,
    fontFamily: 'Abel'
  },
  ingredientContainer: {
    fontFamily: 'Abel',
    paddingLeft:20,
    marginRight:110,    
  },
  ingredientStep: {
    display:'flex', 
    flexDirection:'row',
  },
  bodyText:{
    paddingBottom:5,
    fontSize:16
  },
  ingredientNum: {
    fontSize:30,    
    textAlign:'right',
    paddingLeft:0,
    maxWidth:40,
    minWidth:40
  },
  ingredientData: {
    left:20
  },
  divider: {
    borderBottom:1, 
    borderColor:'lightgrey',
    marginTop:20,
    marginBottom:10,
  }
});

export default styles;