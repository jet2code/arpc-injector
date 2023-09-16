**ATTENTION**
PLEASE BACKUP YOUR FLIGHTSIMULATOR.EXE BEFORE PROCEEDING!

Getting Started:
1. Move `FlightSimulator.exe` from your MSFS installation to your Desktop. (MS store users may have to take ownership of the folder containing the .exe and boot in Safe Mode to do so)
2. Download `node.js v18.17.1` LTS from https://nodejs.org/en
3. Open Powershell and `cd` to the extracted `arpc-injector` folder (e.g. `cd desktop`)
4. Run `node app.js`
5. Follow the prompts listed below.

Steam Users:
6. Enter the FOLDER where `FlightSimulator.exe` is located (e.g. C:\Users\YOURUSERNAME\Desktop). Do NOT include `FlightSimulator.exe` in the path.
7. Type 2 or 3 then press enter. (2 recommended)
8. Check the generated `log.txt` once the script stops running, or read the console log. If the log contains "Complete" and a FlightSimulator_Backup.exe was created, then the injection was successful. Drag both .exe's back into the  installation folder.

MS Store Users:
**CAUTION**
Some `FlightSimulator.exe's` are encrypted and are unable to be modified. Please read the log.txt after running the injector to see if your .exe is encrypted.

6. Enter the FOLDER where `FlightSimulator.exe` is located (e.g. C:\Users\YOURUSERNAME\Desktop). Do NOT include `FlightSimulator.exe` in the path.
7. Type 2 or 3 then press enter. (2 recommended)
8. Check the generated `log.txt` once the script stops running, or read the console log. If the log contains "Complete" and a FlightSimulator_Backup.exe was created, then the injection was successful. Drag both .exe's back into the  installation folder.

Errors:
No offsets found: The offsets contained in ./data/coefficients.txt were not found in the FlightSimulator.exe. The default coefficients are always used on the first run so FlightSimulator.exe's that are already modified will not work. Please revert to a default FlightSimulator.exe before proceeding.

FlightSimulator.exe is encrypted: Some MS Store installations are encrypted which prevents the injector from working properly. The injector will quit without modifying the .exe. There is no guaranteed solution for obtaining an unencrypted FlightSimulator.exe. 

Injector immediately closes when opening: Ensure the path set in directory.txt contains FlightSimulator.exe and that you have permission to read AND modify that path. This is common for users who set their default WindowsApps/ or XboxGames/ installation as their injector directory. These folders are heavily protected by Windows and will not grant file system access for the injector, so it is essential you move FlightSimulator.exe (with a backup) to Desktop before proceeding.
