## Credits
Special acknowledgment to **Biology2394** for his efforts in discovering MSFS's coefficients and for his work on ARPC.

## **ATTENTION**
**PLEASE BACKUP YOUR FLIGHTSIMULATOR.EXE BEFORE PROCEEDING!**

### Getting Started:
1. Extract `arpc-injector-main` to your Desktop.
2. Move `FlightSimulator.exe` from your MSFS installation to your Desktop. (MS store users may have to take ownership of the folder containing the .exe and boot in Safe Mode to do so)
3. Download the latest version of node.js LTS from [here](https://nodejs.org/en).
4. Open Windows Powershell **(NOT Node.js)** and type/run the following commands:
5. `cd desktop/arpc-injector-main`
6. then `node app.js`.
7. Follow the prompts listed below.

### Steam Users:
6. Enter the **FOLDER** where `FlightSimulator.exe` is located (e.g. `C:\Users\YOURUSERNAME\Desktop`). Do NOT include `FlightSimulator.exe` in the path.
7. Type `2` or `3` then press enter. (`2` recommended)
8. Check the generated `log.txt` once the script stops running, or read the console log. If the log contains "Complete" and a `FlightSimulator_Backup.exe` was created, then the injection was successful. Drag both .exe's back into the installation folder.

### MS Store Users:
#### **CAUTION**
Some `FlightSimulator.exe's` are encrypted and are unable to be modified. After running the injector, please read the `log.txt` to see if your .exe is encrypted. If so, follow the steps [here](https://github.com/jet2code/arpc-injector/issues/1) and try again. 

6. Enter the **FOLDER** where `FlightSimulator.exe` is located (e.g. `C:\Users\YOURUSERNAME\Desktop`). Do NOT include `FlightSimulator.exe` in the path.
7. Type `2` or `3` then press enter. (`2` recommended)
8. Check the generated `log.txt` once the script stops running, or read the console log. If the log contains "Complete" and a `FlightSimulator_Backup.exe` was created, then the injection was successful. Drag both .exe's back into the installation folder.

### Errors:
- **No offsets found:** The offsets in `./data/coefficients.txt` were not found in the `FlightSimulator.exe`. The default coefficients are always used on the first run so `FlightSimulator.exe's` that are already modified will not work. Please revert to a default `FlightSimulator.exe` before proceeding. If you have previously used `arpc-injector` and your .exe has been reset to default values, please also delete `./data/coefficients.txt` and try again. 

- **FlightSimulator.exe is encrypted:** Some MS Store installations are encrypted which prevents the injector from working properly. Follow the steps [here](https://github.com/jet2code/arpc-injector/issues/1) to unlock your .exe and try again.

- **Injector immediately closes when opening:** Ensure the path set in `directory.txt` contains `FlightSimulator.exe` and that you have permission to read AND modify that path. This is common for users who put their default `WindowsApps/` or `XboxGames/` installation as their injector directory. These folders are heavily protected by Windows and will not grant file system access for the injector, so you must move `FlightSimulator.exe` (with a backup) to Desktop before proceeding.
