import { View, ViewStyle } from "react-native";

interface CardProps extends React.PropsWithChildren {
    style?:ViewStyle,
    
}

function Card({children,style={}}:CardProps) {
  return (
    <View 
    style={{
        padding:15,
        borderRadius:15,
        backgroundColor:"white",
        elevation:8,
        shadowColor:"#000",
        shadowOffset:{height:6,width:0},
        shadowOpacity:0.15,
        ...style
    }}
    >
    {children}
    </View>
  )
}

export default Card;