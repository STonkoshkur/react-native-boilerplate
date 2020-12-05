import React, { FC } from 'react';
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  Text,
} from 'react-native';
// styling
import { useThemeSchema } from 'src/hooks/useThemeShema';

type InputProps = TextInputProps & {
  label: string;
  error?: string;
};

const Input: FC<InputProps> = ({ label, error, ...props }) => {
  const { colors } = useThemeSchema();

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text
          style={[styles.label, { color: error ? colors.error : colors.text }]}>
          {label}
        </Text>
      </View>
      <View>
        <TextInput
          {...props}
          style={[
            styles.input,
            {
              borderColor: error ? colors.error : colors.border,
              color: colors.text,
              backgroundColor: colors.input,
            },
            props.style,
          ]}
        />
      </View>
      <View style={styles.errorContainer}>
        {Boolean(error) && (
          <Text style={[styles.error, { color: colors.error }]}>{error}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
  },
  labelContainer: {
    paddingLeft: 22,
  },
  label: {
    fontSize: 16,
    fontWeight: '900',
  },
  input: {
    borderRadius: 22,
    borderWidth: 1,
    fontSize: 16,
    marginTop: 6,
    paddingBottom: 14,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 14,
  },
  errorContainer: {
    marginTop: 4,
    minHeight: 14,
    paddingLeft: 22,
  },
  error: {
    fontSize: 14,
  },
});

export default Input;
