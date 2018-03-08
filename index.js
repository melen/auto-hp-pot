const Command = require('command')

module.exports = function AutoHealthPot (dispatch) {

	let command = Command(dispatch);

	let minHp = 30000;

	let potTimer;
	let rawGameId;
	let canPot = true;

	command.add('autohp', (str) => {
		minHp = parseInt(str);
		command.message('Automatically health pot at ' + minHp + 'hp');
	})

	dispatch.hook('S_LOGIN', 9, _ => {
        rawGameId = _.gameId;
	});

	dispatch.hook('S_PLAYER_STAT_UPDATE', 9, _ => {
        hp = parseInt(_.hp.toString());
        if (hp < minHp) useHpPot();
    });

    function useHpPot() {
        if (canPot) {
        	dispatch.toServer('C_USE_ITEM', 1, {
	            ownerId: rawGameId,
	            item: 6552,
	            id: 0,
	            unk1: 0,
	            unk2: 0,
	            unk3: 0,
	            unk4: 1,
	            unk5: 0,
	            unk6: 0,
	            unk7: 0,
	            x: 0,
	            y: 0,
	            z: 0,
	            w: 0,
	            unk8: 0,
	            unk9: 0,
	            unk10: 0,
	            unk11: 1
	        });
	        canPot = false;
	        potTimer = setTimeout(() => {
	        	canPot = true;
	        }, 10000)
        }
    }

}