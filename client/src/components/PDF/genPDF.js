import { React, useState } from 'react'
import { usePDF, pdf, PDFDownloadLink, Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { Button } from 'antd';
import { formatTime } from '../SingleRecipe/DisplayTime';
import { updateList } from '../SingleRecipe/ListIngredients'

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
    paddingTop: 5,
    paddingBottom: 5,
    marginTop:15,
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

const MyDocument = (prop) => {
  console.log('dirname',__dirname) 
  let docData = prop.data;
  console.log('docdata',docData)
  return(
    <Document>
      {docData && 
        <Page size="A4" style={styles.page} wrap={false}>
          <View>
            <Text style={styles.title}>
              {docData.name}
            </Text>
          </View>
          <View style={styles.timeContainer}>
            <View style={styles.time}>
              <Text style={styles.timeTitle}>
                Prep Time
              </Text>
              <Text style={styles.timeNumber}>
                {formatTime(docData.time.prepHour, docData.time.prepMin)}
              </Text>
            </View>
            <View style={[styles.time, {borderLeft:1, borderRight:1}]}>
              <Text style={styles.timeTitle}>
                Total Time
              </Text>
              <Text style={styles.timeNumber}>
                {formatTime(docData.time.prepHour + docData.time.cookHour, docData.time.prepMin + docData.time.cookMin)}
              </Text>
            </View>
            <View style={styles.time}>
              <Text style={styles.timeTitle}>
                Servings
              </Text>
              <Text style={styles.timeNumber}>
                {docData.servingSize * docData.editRatio}
              </Text>
            </View>
          </View>
          <View style={styles.column}>
            {console.log(docData.ingredients)}
            <Text style={styles.subheader}>
              Ingredients
            </Text>
            {docData.ingredients.map((data) => (
              <Text style={styles.bodyText}>
                {updateList(data.quantity, docData.editRatio)}
                {data.unitOfMeasure
                  ? ' ' + data.unitOfMeasure + ' ' + data.description
                  : ' ' + data.description}
              </Text>
              ))}
          </View>
          <View style={styles.divider} />
          <View style={styles.ingredientContainer}>
            <Text style={styles.subheader}>
              Directions
            </Text>
            { docData.directions.map((data, index) => (
                <View style={[styles.ingredientStep, styles.bodyText]}>
                  <Text style={styles.ingredientNum}>{index+1}</Text>
                  <Text style={styles.ingredientData}>{data}</Text>
                </View>
              ))}
          </View>
        </Page>      
      }

    </Document>
  );
};
  
const App = (prop) => {
  console.log('PROP\n', prop)
  const blob = pdf(MyDocument).toBlob();
  const [instance, updateInstance] = usePDF({ document: <MyDocument data={prop && prop.data} /> });

  return (
    <div>
      {/* {console.log('after prop')}
      {prop &&
        <PDFDownloadLink document={<MyDocument data={prop.data}/>} fileName={(prop.name + ".pdf")}>
          
          {({ blob, url, loading, error }) =>
            
            loading ? 'Loading document...' : 'Download now'
            + (console.log('url', url))
          }
        </PDFDownloadLink>


      } */}
      {instance.url}
    </div>
  );
};

// const App = (prop) => {
//   const [instance, updateInstance] = usePDF({ document: <MyDocument data={prop.data} /> });

//   if (instance.loading) return <div>Loading ...</div>;

//   if (instance.error) return <div>Something went wrong: {instance.error}</div>;

//   return (
//     <a href={instance.url} download={(prop.name + ".pdf")}>
//       Download
//     </a>
//   );
// }

export default App;