import isEmpty from "lodash/isEmpty";
import _split from "lodash/split";
import _last from "lodash/last";
import _head from "lodash/head";
import _filter from "lodash/filter";
import _map from "lodash/map";

function splitCode(string) {
  const splitedStringByEnter = _split(string, "\n");

  //isStartOnOneStringWithAnotherCode???

  //string where finds *START*
  const findStringWithStartMarker = _filter(splitedStringByEnter, (item) =>
    item.includes("*START*")
  );
  const stringsSeparatedByStart = _split(
    _head(findStringWithStartMarker),
    "*START*"
  );
  const isSoloStart = isEmpty(_head(stringsSeparatedByStart).trim()); //HERE ANSWER
  // isStartOnOneStringWithAnotherCode DONE

  let beforeStart = [];
  let markedStrings = [];
  let markedStrings2 = [];
  let stringAfterStart = [];
  let beforeFinish = [];
  let stringAfterFinish = [];

  const isStartFinishInOneLine = _last(stringsSeparatedByStart).includes(
    "*FINISH*"
  ); // is START and FINISH on one line?
  //IF NEED TO MARKED ON ONE LINE ----------------------------------------
  if (isStartFinishInOneLine) {
    const wholeStringDivideBySart = _split(string, "*START*");
    const separatedStringByEnterBeforeStart = _split(
      //strings before START NOTE MARKED
      _head(wholeStringDivideBySart),
      "\n"
    );
    const separatedStringByEnterAfterStart = _split(
      //strings after START  MARKED
      _last(wholeStringDivideBySart),
      "\n"
    );
    const stringWhereWasStartMarkBefore = separatedStringByEnterBeforeStart.pop(); // string before START
    const stringWhereWasStartMarkAfter = separatedStringByEnterAfterStart.shift(); // string after START

    const stringAfterAStartWithFinish = stringWhereWasStartMarkAfter.split(
      "*FINISH*"
    );
    const stringWithFinishMarkWithoutStart = _last(stringsSeparatedByStart);
    const stringAfterFinishWithoutFinish = _split(
      _last(_split(string, stringWithFinishMarkWithoutStart)).trim(),
      "\n"
    );
    beforeStart = _map(separatedStringByEnterBeforeStart, (item) => {
      // completed array of code before start
      return {
        code: item,
      };
    });
    markedStrings = {
      code: [stringWhereWasStartMarkBefore, ...stringAfterAStartWithFinish],
      isBetweenStartFinish: true,
      isStartSeparated: 25,
    };
    stringAfterFinish = _map(stringAfterFinishWithoutFinish, (item) => {
      return {
        code: item,
      };
    });
    return [...beforeStart, markedStrings, ...stringAfterFinish];
  }
  //IF NEED TO MARKED ON ONE LINE END----------------------------------------

  //SEPARATED BY START -------------------------------------------------------------------------------------------------
  if (!isSoloStart) {
    const wholeStringDivideBySart = _split(string, "*START*");
    const separatedStringByEnterBeforeStart = _split(
      //strings before START NOTE MARKED
      _head(wholeStringDivideBySart),
      "\n"
    );
    const separatedStringByEnterAfterStart = _split(
      //strings after START  MARKED
      _last(wholeStringDivideBySart),
      "\n"
    );
    const stringWhereWasStartMarkBefore = separatedStringByEnterBeforeStart.pop(); // string before START
    const stringWhereWasStartMarkAfter = separatedStringByEnterAfterStart.shift(); // string after START

    beforeStart = _map(separatedStringByEnterBeforeStart, (item) => {
      // completed array of code before start
      return {
        code: item,
      };
    });
    markedStrings = {
      code: [stringWhereWasStartMarkBefore, stringWhereWasStartMarkAfter],
      isStartSeparated: true,
    };
    stringAfterStart = [...separatedStringByEnterAfterStart];
  } else {
    beforeStart = _map(
      _split(_head(_split(string, "*START*")).trim(), "\n"),
      (item) => {
        return {
          code: item,
        };
      }
    );
    stringAfterStart = _split(_last(_split(string, "*START*")).trim(), "\n");
  }
  //SEPARATED BY START END-------------------------------------------------------------------------------------------------
  //isFinishOnOneStringWithAnotherCode???

  //string where finds *FINISH*
  const findStringWithFinishMarker = _filter(splitedStringByEnter, (item) =>
    item.includes("*FINISH*")
  );
  const stringsSeparatedByFinish = _split(
    _head(findStringWithFinishMarker),
    "*FINISH*"
  );
  const isSoloFinish = isEmpty(_head(stringsSeparatedByFinish).trim()); //HERE ANSWER
  // isFinishOnOneStringWithAnotherCode DONE
  let wholeStringDivideByFinish;

  //SEPARATED BY FINISH-------------------------------------------------------------------------------------------------
  if (!isSoloFinish) {
    wholeStringDivideByFinish = _split(stringAfterStart.join("\n"), "*FINISH*");

    const separatedStringByEnterBeforeFinish = _split(
      //strings before FINISH NOTE MARKED
      _head(wholeStringDivideByFinish),
      "\n"
    );
    const separatedStringByEnterAfterFinish = _split(
      //strings after FINISH  MARKED
      _last(wholeStringDivideByFinish),
      "\n"
    );
    const stringWhereWasFinishMarkBefore = separatedStringByEnterBeforeFinish.pop(); // string before FINISH
    const stringWhereWasFinishMarkAfter = separatedStringByEnterAfterFinish.shift(); // string after FINISH

    beforeFinish = _map(separatedStringByEnterBeforeFinish, (item) => {
      // completed array of code before FINISH
      return {
        code: item,
        marked: true,
      };
    });
    markedStrings2 = {
      code: [stringWhereWasFinishMarkBefore, stringWhereWasFinishMarkAfter],
      isStartSeparated: false,
    };
    stringAfterFinish = _map(separatedStringByEnterAfterFinish, (item) => {
      return {
        code: item,
      };
    });
  } else {
    wholeStringDivideByFinish = _split(stringAfterStart.join("\n"), "*FINISH*");
    beforeFinish = _map(
      _split(_head(wholeStringDivideByFinish).trim(), "\n"),
      (item) => {
        return {
          code: item,
          marked: true,
        };
      }
    );
    stringAfterFinish = _map(
      _split(_last(_split(string, "*FINISH*")).trim(), "\n"),
      (item) => {
        return {
          code: item,
        };
      }
    );
  }

  //SEPARATED BY FINISH END-------------------------------------------------------------------------------------------------
  let everyStringToObject = [];
  if (isEmpty(markedStrings) && isEmpty(markedStrings2)) {
    everyStringToObject = [
      ...beforeStart,
      ...beforeFinish,
      ...stringAfterFinish,
    ];
  } else if (isEmpty(markedStrings2)) {
    everyStringToObject = [
      ...beforeStart,
      markedStrings,
      ...beforeFinish,
      ...stringAfterFinish,
    ];
  } else if (isEmpty(markedStrings)) {
    everyStringToObject = [
      ...beforeStart,
      ...beforeFinish,
      markedStrings2,
      ...stringAfterFinish,
    ];
  } else {
    everyStringToObject = [
      ...beforeStart,
      markedStrings,
      ...beforeFinish,
      markedStrings2,
      ...stringAfterFinish,
    ];
  }

  return everyStringToObject;
}

export default splitCode;
