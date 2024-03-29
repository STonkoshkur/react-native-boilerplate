import React, { FC, useState } from 'react';
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  Text,
} from 'react-native';
// styling
import { useThemeSchema } from 'src/hooks/useThemeShema';

export type InputProps = TextInputProps & {
  label: string;
  error?: string | string[];
};

const Input: FC<InputProps> = ({ label, error, ...props }) => {
  const errorToDisplay = Array.isArray(error) ? error.join(', ') : error;

  const [isFocused, setIsFocused] = useState(false);

  const { colors } = useThemeSchema();

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text
          style={[
            styles.label,
            { color: errorToDisplay ? colors.error : colors.text },
          ]}>
          {label}
        </Text>
      </View>
      <View>
        <TextInput
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          style={[
            styles.input,
            {
              borderColor: errorToDisplay
                ? colors.error
                : isFocused
                ? colors.primary
                : colors.border,
              color: colors.text,
              backgroundColor: colors.input,
            },
            props.editable === false && {
              ...styles.disabledInput,
              backgroundColor: colors.background,
            },
            props.style,
          ]}
        />
      </View>
      <View style={styles.errorContainer}>
        {Boolean(errorToDisplay) && (
          <Text style={[styles.error, { color: colors.error }]}>
            {errorToDisplay}
          </Text>
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
  disabledInput: {
    borderStyle: 'dashed',
    opacity: 0.8,
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
