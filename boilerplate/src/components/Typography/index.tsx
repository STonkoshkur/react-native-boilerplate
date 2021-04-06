/* eslint-disable react-native/no-unused-styles */
import React, { FC, memo, useMemo, PropsWithChildren } from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
// styling
import { useThemeSchema } from 'src/hooks/useThemeShema';
import Colors from 'src/styles/colors';

/**
 * CSS font weight aliases
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#common_weight_name_mapping
 */
export enum TypographyWeights {
  thin = '100',
  extraLight = '200',
  lite = '300',
  normal = '400',
  medium = '500',
  semiBold = '600',
  bold = '700',
  extraBold = '800',
  black = '900',
}

export enum TypographyVariants {
  largeTitle = 'largeTitle',
  title1 = 'title1',
  title2 = 'title2',
  title3 = 'title3',
  headline = 'headline',
  body = 'body',
  callout = 'callout',
  subhead = 'subhead',
  footnote = 'footnote',
  caption1 = 'caption1',
  caption2 = 'caption2',
}

export enum TypographyAppearances {
  default = 'text',
  muted = 'mutedText',
  alternative = 'alternativeText',
}

export type TypographyProps = TextProps & {
  weight?: keyof typeof TypographyWeights;

  /**
   * Typography variand to be displayed.
   *
   * Variant values are based on Apple Human Interface Guidelines:
   * https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/typography/
   */
  variant?: keyof typeof TypographyVariants;

  /**
   * Text color apearence. Based on colors from active style theme.
   * `theme.colors.text` value is used by default.
   *
   * Use `muted` for displaying secondary text (description, caption, hints, etc).
   * `theme.colors.mutedText` value is used.
   *
   * Use `alternative` for displaying light text on a dark content in light themes and vice versa.
   * `theme.colors.alternativeText` value is used.
   *
   * Passing `color` or `style` props can override this value.
   */
  appearance?: keyof typeof TypographyAppearances;

  /**
   * Sets the color of the text.
   * Passing `style` prop can override this value.
   */
  color?: string;
};

const Typography: FC<PropsWithChildren<TypographyProps>> = ({
  weight,
  variant,
  color,
  style,
  appearance = 'default',
  children,
  ...props
}) => {
  const { colors } = useThemeSchema();
  const currentVariant = useMemo(
    () => (variant ? styles[variant] : styles.body),
    [variant],
  );

  const appearanceColor = useMemo(() => {
    const appearanceColorName = TypographyAppearances[appearance];

    return colors[appearanceColorName] ?? colors.text;
  }, [appearance, colors]);

  return (
    <Text
      {...props}
      style={[
        currentVariant,
        !!weight && { fontWeight: TypographyWeights[weight] },
        { color: color ?? appearanceColor },
        style,
      ]}>
      {children}
    </Text>
  );
};

export const styles = StyleSheet.create({
  largeTitle: {
    color: Colors.black,
    fontSize: 33,
    fontWeight: TypographyWeights.normal,
  },
  title1: {
    color: Colors.black,
    fontSize: 27,
    fontWeight: TypographyWeights.normal,
  },
  title2: {
    color: Colors.black,
    fontSize: 21,
    fontWeight: TypographyWeights.normal,
  },
  title3: {
    color: Colors.black,
    fontSize: 19,
    fontWeight: TypographyWeights.normal,
  },
  headline: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: TypographyWeights.semiBold,
  },
  body: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: TypographyWeights.normal,
  },
  callout: {
    fontSize: 15,
    fontWeight: TypographyWeights.normal,
  },
  subhead: {
    fontSize: 14,
    fontWeight: TypographyWeights.normal,
  },
  footnote: {
    fontSize: 12,
    fontWeight: TypographyWeights.normal,
  },
  caption1: {
    fontSize: 11,
    fontWeight: TypographyWeights.normal,
  },
  caption2: {
    fontSize: 11,
    fontWeight: TypographyWeights.normal,
  },
});

export default memo(Typography);
