import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

export default function Detail(){
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}`

  function backHome(){
    navigation.navigate('Incidents');
  }

  function sendMail(){
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    });
  }

  function sendWhatsapp(){
    Linking.openURL(`whatsapp://send?phone=+55${incident.whatsapp}&text=${message}`);
  }

  return (
    <View style={styles.container}>
      {/* Header - inicio */}
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity style={styles.detailsButton} onPress={backHome}>
          <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>
      </View>
      {/* Header - fim */}

      {/* Detalhes do Caso - inicio */}
      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0}]}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>ONG:</Text>
        <Text style={styles.incidentValue}>{incident.name} de {incident.city} - {incident.uf}</Text>

        <Text style={styles.incidentProperty}>DETALHES:</Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>
      </View>
      {/* Detalhes do Caso - fim */}

      {/* Box de Contato - inicio */}
      <View style={styles.boxContact}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.textButton}>E-mail</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.textButton}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
        
      </View>
      {/* Box de Contato - fim */}
    </View>
  );
};