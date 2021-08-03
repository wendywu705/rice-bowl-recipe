import { React, useState } from 'react'
import { Button } from 'antd';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { formatTime } from '../SingleRecipe/DisplayTime';
import { updateList } from '../SingleRecipe/ListIngredients';
import styles from './pdfStyle';
import { 
  PDFDownloadLink, 
  Page, 
  Text, 
  View, 
  Document, 
} from '@react-pdf/renderer';

const MyDocument = (prop) => {
  let docData = prop.data;
  return(
    <Document>
      {docData && docData.time &&
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
  
const App = (prop) => {  const [load, setLoad] = useState(false)
  const disableBtn = (url) =>{
      let btn = document.getElementById('pdfButton');
      if (btn && url==null) {
        btn.disabled = true
      } else if (btn){
        btn.disabled = false
      }
  }
  return (
    <div className="pdfDownload">
      {prop && 
        <Button 
          id="pdfButton"
          className="pdfButtonClass"
          size="large"
          style={{
            fontSize: '20px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 200,
            position: 'absolute',
            right: 100,
          }}
          icon={
            <VerticalAlignBottomOutlined
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                fontSize: 'small',
                paddingRight: 10
              }}
            />
          }
        >
        <PDFDownloadLink document={<MyDocument data={prop.data}/>} fileName={(prop.name + ".pdf")}>
            {({ blob, url, loading, error }) => {
              return(
                <div>
                  {loading ? 'Loading document...' : 'Download now'}
                  {disableBtn(url)}
                </div>              
              );
            }}
          </PDFDownloadLink>      
        </Button>
      }
    </div>
  );
};

export default App;