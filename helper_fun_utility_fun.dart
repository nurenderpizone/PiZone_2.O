// _  private function
// Closure in JS
Future<void> _generateLayoutThreePages(
  pdf,
  List printStrokesList,
  double marginTop,
  double marginBottom,
  double marginLeft,
  double marginRight,
  String formattedDate,
  int pageIndex,
  String action,
) async {
  // Helper function
  void _addPdfPage(int index) {
    //  return Value
  }

  // Add the first page for 'whatsapp' action
  if (action == 'whatsapp') {
    _addPdfPage(pageIndex);
  }

  // Add pages based on printStrokesList
  for (var i = 0; i < printStrokesList.length; i++) {
    if (printStrokesList[i]['isPrint'] == true) {
      _addPdfPage(i);
    }
  }
}
