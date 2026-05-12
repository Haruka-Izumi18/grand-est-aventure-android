import { StyleSheet } from 'react-native';
import { COLORS, FONT } from './theme';

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 15,
    paddingHorizontal: 30,
    gap: 5,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: 16 ,
  },
  label: {
    fontFamily: FONT.regular,
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "700",
  },
  input: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    paddingVertical: 16,
    paddingHorizontal: 14,
    fontFamily: 'SpaceMono_700Bold',
    fontSize: 16,
    color: COLORS.primary,
    marginTop: 12,
  },
  button: {
    backgroundColor: COLORS.green,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: FONT.regular,
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },
  buttonWhite: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderColor: COLORS.green,
    borderWidth: 2,
    borderRadius: 12,
  },
  buttonTextGreen: {
    fontFamily: FONT.regular,
    color: COLORS.green,
    fontSize: 18,
    fontWeight: "700",
  },
  title: {
    fontFamily: FONT.regular,
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: "900",
    textAlign: 'center',
  },
  titleh2: {
    fontFamily: FONT.regular,
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "900",
    textAlign: 'center',
  }
});