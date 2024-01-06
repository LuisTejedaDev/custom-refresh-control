import { StyleSheet, ScrollView, View } from "react-native"

export default ({Item, margin = 0, data = []}) => {
    
    return(
        <ScrollView
            /* 
                Agregamos ScrollView para no tener que mandar a llamar cada que usemos nuestro AdaptiveWrapper por separado, tenemos que agregar el contentContainerStyle con los siguientes estilos:
                
                contentContainerStyle={{paddingBottom: (margin + 35), marginTop: (margin + 25) }}

                - (paddingBottom) nos debe de dar como suma la altura de nuestro componente de Header que le mandamos como Prop.

                En nuestro caso nuestro <Header /> tiene 55px de altura, nuestro margin tiene 20 por lo que para llegar a 55px nos hacen falta 35, esa es la formula de nuestro paddingBottom.

                - (marginTop): La suma debe de ser 10px menos que la altura total de nuestro <Header />
            */
            contentContainerStyle={{paddingBottom: (margin + 35), marginTop: (margin + 25) }}
            style={{height: 'auto', width: '100%'}}
            showsVerticalScrollIndicator={false}
        >
            <View style={[styles.wrapper, {marginTop: margin, marginLeft: margin}]}>
            {
                data.map(x => 
                    <Item
                        key={x.id}
                        {...x}
                        extraStyle={{marginTop: margin, marginRight: margin}}
                    />
                )
            }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        height: 'auto',
        alignSelf: 'stretch',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    }
})