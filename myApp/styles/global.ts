import { StyleSheet } from 'react-native';
import { COLORS, FONT, FONT_SIZE } from './theme';

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
    fontSize: FONT_SIZE.lg,
  },
  input: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontFamily: 'SpaceMono_700Bold',
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
    marginTop: 12,
  },
  button: {
    backgroundColor: COLORS.green,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    width: 150
  },
  buttonText: {
    fontFamily: FONT.bold,
    color: COLORS.white,
    fontSize: FONT_SIZE.md,
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
    width: 150
  },
  buttonTextGreen: {
    fontFamily: FONT.regular,
    color: COLORS.green,
    fontSize: FONT_SIZE.md
  },
  title: {
    fontFamily: FONT.regular,
    color: COLORS.primary,
    fontSize: FONT_SIZE.title,
    textAlign: 'center',
  },
  titleh2: {
    fontFamily: FONT.regular,
    color: COLORS.primary,
    fontSize: FONT_SIZE.lg,
    textAlign: 'center',
  },
  titleGreen: {
    fontFamily: FONT.bold,
    color: COLORS.green,
    fontSize: FONT_SIZE.xl
  },
  card: {
        width: "100%",
        backgroundColor: "#fef5d9",
        borderColor: "#b4b4b4",
        borderWidth: 1.5,
        borderRadius: 16,
        padding: 20,
        marginTop: 16,
        gap: 5,
    },
    logout: {
        color: "red",
        textAlign: "right",
        fontSize: FONT_SIZE.md,
        fontWeight: "700",
        paddingHorizontal: 8,
    }
});