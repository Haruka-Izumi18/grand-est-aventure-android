import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 30,
    paddingTop: 80,
  },
  input: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    paddingVertical: 16,
    paddingHorizontal: 14,
    fontSize: 16,
    color: COLORS.primary,
    marginTop: 12,
  },
  button: {
    backgroundColor: COLORS.green,
    alignItems: "center",
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },
  title: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: "900",
    textAlign: 'center',
  }
});