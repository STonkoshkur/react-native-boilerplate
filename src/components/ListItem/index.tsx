import React, { FC, PropsWithChildren } from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableHighlight,
} from 'react-native';
// conponents
import ListItemTitle from 'src/components/ListItem/Title';
import ListItemSubtitle from 'src/components/ListItem/Subtitle';
import ListItemContent from 'src/components/ListItem/Content';
import ListItemIcon from 'src/components/ListItem/Icon';
// utils
import ColorUtil from 'color';
// styling
import { useThemeSchema } from 'src/hooks/useThemeShema';
import { Colors } from 'src/styles';

type ListItemProps = {
  topDivider?: boolean;
  bottomDivider?: boolean;
  disabled?: boolean;
  testID?: string;

  onPress?: () => void;
  onLongPress?: () => void;

  style?: StyleProp<ViewStyle>;
  disabledStyle?: StyleProp<ViewStyle>;
};

export type ListItemSubcomponents = {
  Title: typeof ListItemTitle;
  Subtitle: typeof ListItemSubtitle;
  Content: typeof ListItemContent;
  Icon: typeof ListItemIcon;
};

const ListItem: FC<PropsWithChildren<ListItemProps>> & ListItemSubcomponents =
  ({
    topDivider = false,
    bottomDivider = false,
    disabled = false,
    onLongPress,
    onPress,
    style,
    disabledStyle,
    children,
    ...props
  }) => {
    const { colors } = useThemeSchema();

    return (
      <TouchableHighlight
        {...props}
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={!!disabled}
        underlayColor={ColorUtil(colors.border).alpha(0.6).rgb().string()}
        style={[
          StyleSheet.flatten([
            styles.listItemWraper,
            { backgroundColor: colors.card },
          ]),
          !!topDivider &&
            StyleSheet.flatten([
              styles.topDivider,
              { borderTopColor: colors.border },
            ]),
          !!bottomDivider &&
            StyleSheet.flatten([
              styles.bottomDivider,
              { borderBottomColor: colors.border },
            ]),
          style,
          !!disabled && disabledStyle,
        ]}>
        <>{children}</>
      </TouchableHighlight>
    );
  };

// styles
const styles = StyleSheet.create({
  listItemWraper: {
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  topDivider: {
    borderTopColor: Colors.gainsboroGray,
    borderTopWidth: 1,
  },
  bottomDivider: {
    borderBottomColor: Colors.gainsboroGray,
    borderBottomWidth: 1,
  },
});

// subcomponents
ListItem.Title = ListItemTitle;
ListItem.Subtitle = ListItemSubtitle;
ListItem.Content = ListItemContent;
ListItem.Icon = ListItemIcon;

export default ListItem;
