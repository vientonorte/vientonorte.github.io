# Passkeys GitHub `vientonorte` — DoD

**Cuenta:** [vientonorte](https://github.com/vientonorte) (User)  
**Security:** https://github.com/settings/security  
**Sessions:** https://github.com/settings/sessions  

## Tres sistemas distintos

| Superficie | Qué es |
|------------|--------|
| **GitHub account** | Login de la cuenta `vientonorte` ← **este checklist** |
| **Hub** `vientonorte.io` passkey | Cards “private” en el hub |
| **Worker admin fotos** | `/#/admin/fotos` · `WEBAUTHN_RP_ID` |

## 1. Cuenta (hoy)

1. Entra como **vientonorte** en el **browser** (no solo `gh`).
2. https://github.com/settings/security
3. **Enable two-factor authentication** si aún no.
4. **Add a passkey** en este Mac (Touch ID) — etiqueta `M5-TouchID`.
5. **Add a passkey** en el iPhone (Face ID / iCloud Keychain) — `iPhone-RN`.
6. Guarda **recovery codes** offline (1Password / papel).
7. Quita **SMS** como 2FA principal si puedes (SIM swap).

## 2. Multi-device

- Cada máquina: passkey propia **o** iCloud Keychain (mismo Apple ID).
- PC Windows: Windows Hello o YubiKey — `YubiKey-1`.
- Etiqueta todas las passkeys en Settings.

## 3. Tokens y CLI (`gh`)

- Passkeys = login **web**.
- `gh` / Actions = tokens (`gho_`, PAT).
- Rotar tokens expuestos; fine-grained mínimo scope.
- `gh auth refresh -h github.com -s read:packages` si packages local.

## 4. Repos

- Branch protection `main` (públicos).
- Privados: Pro o public + protect.
- Secrets solo en Actions.

## DoD

- [ ] 2FA activo
- [ ] ≥2 passkeys (Mac + móvil o YubiKey)
- [ ] Recovery codes offline
- [ ] Login prueba en segundo device
- [ ] Passkeys con nombres claros
- [ ] (Opcional) https://github.com/settings/sessions

## Mirror Obsidian

`Viento Norte/Resources/2026-07-28 Passkeys GitHub vientonorte - DoD.md`
