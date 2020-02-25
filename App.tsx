import React, {useState} from 'react';
import {ScrollView, Text, SafeAreaView, TextInput, Button} from 'react-native';
import {AdyenEncryptor, CardForm, EncryptedCard} from 'react-native-adyen';
import env from 'react-native-config';

const App: React.FC = () => {
  const [encryptedData, setEncryptedData] = useState('');
  const [cardForm, setCardForm] = useState<CardForm>({
    cardNumber: '',
    securityCode: '',
    expiryMonth: '',
    expiryYear: '',
  });
  const {ADYEN_PUBLIC_KEY} = env;

  const encryptor = new AdyenEncryptor(ADYEN_PUBLIC_KEY);

  const handleOnPress = () => {
    const promise = encryptor.encryptCard(cardForm);
    promise.then((data: EncryptedCard) => {
      setEncryptedData(
        `encyptedCardNumber: ${data.encryptedCardNumber}\nencryptedSecurityCode: ${data.encryptedSecurityCode}\nencryptedExpiryYear: ${data.encryptedExpiryYear}\nencryptedExpiryMonth: ${data.encryptedExpiryMonth}`,
      );
    });
  };

  return (
    <SafeAreaView>
      <ScrollView style={{padding: 15}}>
        <Text>Adyen React Native</Text>
        <TextInput
          style={{padding: 15}}
          placeholder="Card Number"
          value={cardForm.cardNumber}
          onChangeText={val => setCardForm({...cardForm, cardNumber: val})}
        />
        <TextInput
          style={{padding: 15}}
          placeholder="Security Code"
          value={cardForm.securityCode}
          onChangeText={val => setCardForm({...cardForm, securityCode: val})}
        />
        <TextInput
          style={{padding: 15}}
          placeholder="Expiry Year"
          value={cardForm.expiryYear}
          onChangeText={val => setCardForm({...cardForm, expiryYear: val})}
        />
        <TextInput
          style={{padding: 15}}
          placeholder="Expiry Month"
          value={cardForm.expiryMonth}
          onChangeText={val => setCardForm({...cardForm, expiryMonth: val})}
        />
        <Button title="Submit" onPress={handleOnPress} />
        <Text style={{padding: 15}}>{encryptedData}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
