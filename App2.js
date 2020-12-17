import React , {Component} from 'react';
import {StyleSheet,Text,View,Button, TouchableOpacity} from 'react-native';

export default class App extends Component{
  constructor(){
    super()
    this.state = {
        resultText : '',
        operationText : '',
        isZeroExist : false,
        isDotExist : false,
        isParenthesisExist : false
    }
    
  } 
  
  delLastSign(myString){
    let str = myString.toString()
    let newStr = str.substring(0,str.length-1);
    return newStr;
  }
  getLastSign(myString){
    let str = myString.toString()
    let lastSymbhol = str.substring(str.length-1);
    return lastSymbhol
  }
  parenthesisCheck(myString){
    let newStr = myString.split("").reverse().join("");
    for(let char of newStr){
      if(char == ')'){return true}
      if(char =='('){return false}
    } 
    return true;
  }
  checkingLength(myString){
    let newStr = myString.split("").reverse().join("");
    let newStr1 =  newStr.split('+')[0];
    let newStr2 =  newStr1.split('-')[0];
    let newStr3 =  newStr2.split('/')[0];
    let newStr4 =  newStr3.split('*')[0];
    let stringLength = 0
    for(let char of newStr4){
      if(char > 0 && char <= 9){
        stringLength += 1
      }
    } 
    return stringLength;
  }
  checkingLastZeroOrNOt(myString){
    let newStr = myString.split("").reverse().join("");
    let newStr1 =  newStr.split('+')[0];
    let newStr2 =  newStr1.split('-')[0];
    let newStr3 =  newStr2.split('/')[0];
    let newStr4 =  newStr3.split('*')[0];
    if(newStr4==0){return true}
    else{return false}
  }
  checkingDotExist(myString){
    let newStr = myString.split("").reverse().join("");
    let newStr1 =  newStr.split('+')[0];
    let newStr2 =  newStr1.split('-')[0];
    let newStr3 =  newStr2.split('/')[0];
    let newStr4 =  newStr3.split('*')[0];
    for(let char of newStr4){
      if(char == '.'){return true}
    }
    return false;
  }
  

   buttonPressed(getValue) {
     try {
      if(this.state.resultText !==''){
        if(getValue == '+' || getValue == '-' || getValue == '/' || getValue == '*'){
          this.setState({operationText : this.state.resultText + getValue , resultText : '' })
        }
        else if(getValue <=9 && getValue >=0){
          this.setState({operationText :  getValue , resultText : '' })
        }
        else if(getValue =='='){
          this.setState({operationText : this.state.resultText , resultText : '' })
        }
        else if(getValue =='.'){
          this.setState({operationText : '0.' , resultText : '' })
        }
        else {
          this.setState({operationText : '' , resultText : '' })
        }
    }
    else if(getValue>=0 && getValue<=9 && !this.state.isZeroExist){
      if(getValue == 0 ){ 
        this.setState({
          operationText : this.state.operationText += getValue,
          isZeroExist : true,})
      }
      else{
        this.setState({
          operationText : this.state.operationText += getValue,})
      }
      this.setState({isSignExist:false})
    }
    else if(getValue>=0 && getValue<=9 && this.state.isZeroExist && this.state.isDotExist){
      if(getValue == 0 ){ 
        this.setState({
          operationText : this.state.operationText += getValue,
          isZeroExist : true,})
      }
      else{
        this.setState({
          operationText : this.state.operationText += getValue,})
      }
      this.setState({isSignExist:false})
    }
    else if(getValue>0 && getValue<=9 ){
      if(this.getLastSign(this.state.operationText)=='.'){
          this.setState({
        operationText : this.state.operationText + getValue})
      }
      else if(this.checkingLastZeroOrNOt(this.state.operationText)){
          this.setState({
        operationText : this.delLastSign(this.state.operationText) + getValue})
      }
      else{this.setState({
        operationText : this.state.operationText += getValue,})
      }
    }
    else if(getValue==0 && this.checkingLength(this.state.operationText)>0 ){
      this.setState({
        operationText : this.state.operationText += getValue,})
    }

    else if(getValue == '.' && !this.checkingDotExist(this.state.operationText)){
      if(this.state.operationText == ''){
        this.setState({
          operationText : this.state.operationText += '0.',
      })}
      else if(this.getLastSign(this.state.operationText) == '+' || this.getLastSign(this.state.operationText) == '-'||this.getLastSign(this.state.operationText) == '/'||this.getLastSign(this.state.operationText) == '*'){
        this.setState({
          operationText : this.state.operationText + '0.'
      })}
      else if(this.state.operationText !=='' && this.getLastSign(this.state.operationText)>=0 && this.getLastSign(this.state.operationText)<=9){
        this.setState({
          operationText : this.state.operationText + '.'
      })}
      this.setState({
        isDotExist : true
      })
    }  

    else if(getValue == '+'||getValue == '-'||getValue == '/'||getValue == '*'){ // case(operations)
      if(this.getLastSign(this.state.operationText) >= 0 && this.getLastSign(this.state.operationText) <=9 && this.state.operationText !=='' ||this.getLastSign(this.state.operationText)==')' ){
        if(this.getLastSign(this.state.operationText) == '+' ||this.getLastSign(this.state.operationText) == '-'||this.getLastSign(this.state.operationText) == '*'||this.getLastSign(this.state.operationText) == '/'){
          this.setState({operationText : this.delLastSign(this.state.operationText) + getValue}) 
        }
        else{
          this.setState({operationText : this.state.operationText + getValue}) 
        }
        this.setState({
          isZeroExist : false,
          isDotExist : false,
          isParenthesisExist : false
        })
      } 
    }

    else if(getValue == '='){
      this.setState({
        resultText : eval(this.state.operationText)
      })
    }

    else if(getValue == 'C'){
      this.setState({
        resultText : '',
        operationText : '',
        isZeroExist : false,
        isDotExist : false,
        isParenthesisExist : false
      })
    }
    else if(getValue == 'del'){
      if(this.getLastSign(this.state.operationText)=='.'){
        this.setState({operationText : this.delLastSign(this.state.operationText) , isDotExist : false})
      }
      if(this.getLastSign(this.state.operationText)=='-'||this.getLastSign(this.state.operationText)=='+'||this.getLastSign(this.state.operationText)=='*'||this.getLastSign(this.state.operationText)=='/'){
        this.setState({operationText : this.delLastSign(this.state.operationText) , isDotExist : true,isZeroExist:true})
      }
      else{
        this.setState({operationText : this.delLastSign(this.state.operationText) })
      }
    }
    else if(getValue == '('){
      if(this.parenthesisCheck(this.state.operationText)){this.setState({operationText : this.state.operationText + getValue}) }
    }
    else if(getValue == ')'){
      if(!this.parenthesisCheck(this.state.operationText)){this.setState({operationText : this.state.operationText + getValue}) }
    }  
     } catch (error) {
       this.setState({operationText:'Olan sheydi mellim'})
     }
    
  }
  
  render(){
    let myElems = [['(',')','del','/'],['1','2','3','+'],['4','5','6','-'],['7','8','9','*'],['C',0,'=','.']];
    let rows = [];
    for(let i=0;i<5;i++){
        let row = []
        if(i==0){
          for(let j=0;j<4;j++){
              row.push(<TouchableOpacity style = {styles.rowSpecial} onPress={()=>this.buttonPressed(myElems[i][j])}>
                  <Text style = {styles.specialFont}>{myElems[i][j]}</Text>
                </TouchableOpacity>)
          }
        }
        else{
          for(let j=0;j<4;j++){
            row.push(<TouchableOpacity style = {styles.rowForeach} onPress={()=>this.buttonPressed(myElems[i][j])}>
            <Text style = {styles.font}>{myElems[i][j]}</Text>
          </TouchableOpacity>)
          }
        }
        rows.push(<View style = {styles.row }>{row}</View>)
    }
    return(
      <View style = {styles.device}>
          <View style = {styles.operation}>
              <Text style={styles.operationText}>{this.state.operationText}</Text>
          </View>
          <View style = {styles.result}>
              <Text style={styles.resultText}>{this.state.resultText}</Text>
          </View>
          <View style = {styles.buttons}>
              {rows}
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  device : {
    flex : 1,
  },
  buttons:{
    flex : 2,
    backgroundColor : 'white',

  },
  row:{
    flex : 1,
    backgroundColor : 'white',
    flexDirection : 'row',
    justifyContent : 'space-around',
    alignItems : "center"
  },
  rowForeach :{
    flex : 1,
    backgroundColor : 'white',
    justifyContent : "center",
    alignItems : "center"
  },
  rowSpecial:{
    flex : 1,
    backgroundColor : 'gray',
    justifyContent : "center",
    alignItems : "center",
  },
  operation : {
    flex : 0.5,
    justifyContent :"center",
    alignItems : "flex-end",
    backgroundColor : 'white',
  },
  operationText : {
    fontSize:34,
  },
  result : {
    flex : 0.5,
    alignItems : 'flex-end',
    justifyContent : "center",
    backgroundColor : 'white'
  },
  resultText : {
    fontSize : 35
  },
  font : {
    fontSize : 42
  },
  specialFont:{
    fontSize : 42,
    color:'white'
  }
})